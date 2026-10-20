import React from "react";
import { afterEach, expect, test, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import FormTextInput from "@/components/form/text-input/form-text-input";

afterEach(cleanup);
function Form({
  onSubmit,
  readOnly = false,
}: {
  onSubmit: (data: { password: string }) => void;
  readOnly?: boolean;
}) {
  const methods = useForm({ defaultValues: { password: "secret" } });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormTextInput
          name="password"
          label="Password"
          type="password"
          readOnly={readOnly}
        />
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
}
test("MUI slots preserve value edits, password visibility and form submission", async () => {
  const submit = vi.fn();
  render(<Form onSubmit={submit} />);
  const input = screen.getByLabelText("Password") as HTMLInputElement;
  expect(input.type).toBe("password");
  fireEvent.click(screen.getByLabelText("toggle password visibility"));
  expect(input.type).toBe("text");
  fireEvent.change(input, { target: { value: "updated" } });
  fireEvent.click(screen.getByText("Save"));
  await waitFor(() => expect(submit).toHaveBeenCalled());
  expect(submit.mock.calls[0][0]).toEqual({ password: "updated" });
});
test("readOnly reaches the native input after the slot API migration", () => {
  render(<Form onSubmit={() => {}} readOnly />);
  expect((screen.getByLabelText("Password") as HTMLInputElement).readOnly).toBe(
    true
  );
});
