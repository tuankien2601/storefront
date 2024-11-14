"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { useMutation, gql } from '@apollo/client';
import generateCustomerToken from '@/queries/generateCustomerToken.graphql';

const signInSchemaRegister = z.object({
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

const signUpSchemaRegister = z.object({
  firstname: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  lastname: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function signIn(prevState: any, formData: FormData) {
  const input = {
    password: formData.get("password"),
    email: formData.get("email")
  }

  const validatedFields = signInSchemaRegister.safeParse(input);

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const [exec, { data, loading, error }] = useMutation(generateCustomerToken);

  const result = await exec({ variables: input });

  if (!error) {
    return {
      ...prevState,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  localStorage.setItem("customerToken", data.token);

  redirect("/");
}


export async function signUp(prevState: any, formData: FormData) {
  const input = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    password: formData.get("password"),
    email: formData.get("email"),
    is_subscribed: formData.get("is_subscribed") ?? false
  }

  const validatedFields = signUpSchemaRegister.safeParse(input);

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const [exec, { data, loading, error }] = useMutation(generateCustomerToken);

  const result = await exec({ variables: input })

  if (!error) {
    return {
      ...prevState,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  localStorage.setItem("customerToken", data.token);

  redirect("/");
}