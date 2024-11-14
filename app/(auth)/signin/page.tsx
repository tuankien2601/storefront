'use client';

import { useRouter } from 'next/navigation';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useMutation, gql } from '@apollo/client';
import generateCustomerToken from '@/queries/generateCustomerToken.graphql';
import React from 'react';

export default function () {
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [exec, { data, loading, error }] = useMutation(generateCustomerToken);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();

    const input = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    

    const result = await exec({ variables: input });

    if (result.data) {
      localStorage.setItem('customerToken', result.data.token);
      
    }
  };

  if (loginSuccess) useRouter().push('/');

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput name="email" type="email" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput name="password" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
