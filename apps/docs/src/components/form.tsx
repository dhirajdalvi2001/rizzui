import { z } from "zod";
import DatePicker from "./date-picker";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input, Textarea, Text, AdvancedRadio, Title, Button } from "rizzui";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(10, { message: "Minimum 10 letter is required" }),
  time: z.date({ message: "Date is required" }),
  status: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

export default function RizzUIForm() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SchemaType) => {
    console.log("Submitted data", data);
    toast.success("Successfully Submitted.");
  };

  return (
    <div className="w-full max-w-md">
      <Toaster />
      <div className="mb-10 text-center">
        <Title as="h3">Add Tasks</Title>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-4 items-end"
      >
        <Input
          label="Title"
          placeholder="John Doe"
          {...register("title")}
          error={errors.title?.message}
        />

        <Textarea
          label="Description"
          placeholder="Write you message..."
          {...register("description")}
          error={errors.description?.message}
        />

        <Controller
          control={control}
          name="time"
          render={({ field: { value, onChange } }) => {
            return (
              <div className="w-full [&>div]:w-full">
                <DatePicker
                  selected={value}
                  onChange={onChange}
                  placeholderText="Select Date"
                  inputProps={{
                    label: "Time",
                    error: errors.time?.message,
                    clearable: true,
                    onClear: () => onChange(null),
                  }}
                />
              </div>
            );
          }}
        />

        <div className="w-full h-px bg-gray-200 col-span-full mt-2" />

        <div>
          <Text className="font-semibold mb-2">Status</Text>
          <div className="grid grid-cols-2 gap-x-6 text-center">
            <AdvancedRadio
              size="sm"
              value="done"
              defaultChecked
              {...register("status")}
            >
              <Text className="font-semibold">Done</Text>
            </AdvancedRadio>
            <AdvancedRadio
              size="sm"
              value="inProgress"
              {...register("status")}
            >
              <Text className="font-semibold">In Progress</Text>
            </AdvancedRadio>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
