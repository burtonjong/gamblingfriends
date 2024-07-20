import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type Timer = Schema["Timer"]["type"];

type TimerInput = {
  nextSessionDate: string;
  nextSessionTime: string;
};

export default function SetTimer() {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [timerSet, setTimerSet] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TimerInput>();
  const queryClient = useQueryClient();

  //Get next session date from database
  const { data: timer = [] } = useQuery<Timer[]>({
    initialDataUpdatedAt: 0,
    queryKey: ["Timers", {}],
    queryFn: async () => {
      const response = await client.models.Timer.list();
      return response.data;
    },
  });

  useEffect(() => {
    if (timer.length > 0) {
      setTimerSet(true);
    } else {
      setTimerSet(false);
    }
  }, [timer]);

  //Check is form input date and time are valid
  const isValidDate = (date: string, time: string): boolean => {
    const today = new Date();
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    const inputDate = new Date(year, month - 1, day, hours, minutes);
    return inputDate > today;
  };

  //Creates a new session date
  const createMutation = useMutation({
    mutationFn: async (data: TimerInput) => {
      await client.models.Timer.create({
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Timers"] });
      setTimerSet(true);
    },
    onError: (error) => {
      console.error("Error setting timer", error);
    },
  });

  //Deletes the next session
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await client.models.Timer.delete({ id: timer[0].id });
    },
    onSuccess: () => {
      setTimerSet(false);
      reset();
    },
    onError: (error) => {
      console.error("Could not delete timer", error);
    },
  });

  //Changes the session date
  const editMutation = useMutation({
    mutationFn: async (data: TimerInput) => {
      await client.models.Timer.update({ id: timer[0].id, ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Timers"] });
      setTimerSet(true);
      setToggleEdit(false);
      console.log("success");
    },

    onError: (error) => {
      console.log("Could not change timer", error);
    },
  });

  const createTimer = (data: TimerInput) => {
    createMutation.mutate(data);
  };

  const deleteTimer = () => {
    deleteMutation.mutate();
  };

  const editTimer = (data: TimerInput) => {
    editMutation.mutate(data);
  };

  return (
    <div>
      {timerSet === false || toggleEdit === true ? (
        <form
          onSubmit={
            toggleEdit === false
              ? handleSubmit(createTimer)
              : handleSubmit(editTimer)
          }
          className="flex w-full flex-col justify-center bg-gray-100 p-4"
        >
          <div>
            <label className="">Date</label>

            <input
              {...register("nextSessionDate", {
                required: { value: true, message: "Date is required" },
                validate: (date) => {
                  const [year, month, day] = date.split("-").map(Number);
                  const today = new Date();
                  const inputDate = new Date(year, month - 1, day);
                  return inputDate >= today
                    ? true
                    : "Date must be in the future";
                },
              })}
              className="m-2 w-full rounded border border-gray-300 p-2"
              type="date"
            ></input>
            <p className="text-red-600">{errors.nextSessionDate?.message}</p>
          </div>
          <div>
            <label>Time</label>
            <input
              {...register("nextSessionTime", {
                required: { value: true, message: "Time is required" },
                validate: (time) => {
                  const date = getValues("nextSessionDate");
                  return isValidDate(date, time)
                    ? true
                    : "Time must be in the future";
                },
              })}
              className="m-2 w-full rounded border border-gray-300 p-2"
              type="time"
            ></input>
            <p className="text-red-600">{errors.nextSessionTime?.message}</p>
          </div>
          <div className="m-2 w-full">
            <button
              type="button"
              onClick={
                toggleEdit
                  ? () => {
                      setToggleEdit(false);
                      setValue(
                        "nextSessionDate",
                        timer[0]?.nextSessionDate ?? "",
                      );
                      setValue(
                        "nextSessionTime",
                        timer[0].nextSessionTime ?? "",
                      );
                    }
                  : () => {
                      reset();
                    }
              }
              className="w-1/2 rounded-l-lg bg-red-600 p-2 text-white hover:bg-red-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-r-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              {toggleEdit ? "Confirm Edit" : "Add Date"}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex w-full flex-col justify-center bg-gray-100 p-4">
          <h1 className="m-2 text-2xl font-bold">The next sessions date is:</h1>
          <div className="m-2">
            {timer[0]?.nextSessionDate + " " + timer[0]?.nextSessionTime}
          </div>
          <div className="m-2 w-full">
            <button
              onClick={() => deleteTimer()}
              className="w-1/2 rounded-l-lg bg-red-600 p-2 text-white hover:bg-red-800"
            >
              Delete
            </button>
            <button
              onClick={() => setToggleEdit(true)}
              className="w-1/2 rounded-r-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
