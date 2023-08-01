import React from "react";
import { useForm, useFieldArray, FieldErrors, FieldValue } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export const YouTubeForm = () => {
  const form = useForm<FormValues>({
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: "Akash",
    //     email: data.email,
    //     channel: "",
    //   };
    // },
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });
  const { register, control, handleSubmit, formState, watch, getValues, setValue } = form;
  const { errors,touchedFields,dirtyFields } = formState;
  // console.log(touchedFields,dirtyFields)
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };
  const handleGetValues=()=>{
    const values = getValues()
    console.log(values)
  }
  const handleSetValues=()=>{
    setValue("username","",{
      // shouldDirty:true,
      // shouldTouch:true,
      // shouldValidate:true
    })
  }
  const onError=(errors:FieldErrors<FormValues>)=>{
    console.log("Form Errors ",errors)
  }
  // const watchResults = watch();
  return (
    <div>
      <h1>YouTube Form</h1>
      {/* <h4>Watch Results : {JSON.stringify(watchResults)}</h4> */}
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ || "",
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a diffrent email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "Channel name is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Date of birth is required",
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter",{
              disabled:watch("channel") === "",
              required:"Twitter id is important"
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook",{
              disabled: watch("channel") === "",
              required:"Facebook id is important"
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  ></input>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      style={{ margin: 10 }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => append({ number: "" })}
              style={{ margin: 10 }}
            >
              Add phone number
            </button>
          </div>
        </div>
        {/* <button onClick={handleGetValues} type="button">Get Values</button> */}
        {/* <button onClick={handleSetValues} type="button">Set Values</button> */}
        <button type="submit" disabled={!isDirty}>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
