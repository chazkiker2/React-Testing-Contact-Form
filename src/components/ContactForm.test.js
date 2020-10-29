import '@testing-library/jest-dom/extend-expect';

import "mutationobserver-shim";

import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";
import { act } from 'react-dom/test-utils';
// import { act } from 'react-dom/test-utils';
// import { act } from 'react-dom/test-utils';

describe("ContactForm passes basic functionality test", () => {
	// beforeEach(() => {
	// 	render(<ContactForm />);
	// });
	afterEach(cleanup);

	test("renders ContactForm without errors", () => {
		render(<ContactForm />);
		// render(<ContactForm />);
	});

	test("inputs exist", () => {
		render(<ContactForm />);
		// render(<ContactForm />);

		//if this test fails, it means the htmlFor attribute in labels is not working correctly
		const firstNameInput = screen.getByLabelText(/first name/i);
		const lastNameInput = screen.getByLabelText(/last name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const messageInput = screen.getByLabelText(/message/i);

		expect(firstNameInput).toBeInTheDocument();
		expect(lastNameInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(messageInput).toBeInTheDocument();
	});

	// const setup = () => {
	// 	const utils = render(<ContactForm />);
	// 	return utils;
	// }

	test("form inputs allow typing and update as expected", () => {
		render(<ContactForm />);

		const firstNameInput = screen.getByLabelText(/first name/i);
		const lastNameInput = screen.getByLabelText(/last name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const messageInput = screen.getByLabelText(/message/i);
		// const submitBtn = screen.getByLabelText(/submit/i, { options: { selector: "input" } });
		// act(() => {
		fireEvent.change(firstNameInput, { target: { value: "Name", name: "firstName" } });
		fireEvent.change(lastNameInput, { target: { value: "Last", name: "lastName" } });
		fireEvent.change(emailInput, { target: { value: "ch@z.com", name: "email" } });
		fireEvent.change(messageInput, { target: { value: "message goes here", name: "message" } });
		expect(firstNameInput).toHaveValue("Name");
		expect(lastNameInput).toHaveValue("Last");
		expect(emailInput).toHaveValue("ch@z.com")
		expect(messageInput).toHaveValue("message goes here")
	})

	test("form submission works as expected", () => {
		act(() => {
			render(<ContactForm />);
			// return app;
		})
		const firstNameInput = screen.getByLabelText(/first name/i);
		const lastNameInput = screen.getByLabelText(/last name/i);
		const emailInput = screen.getByLabelText(/email/i);
		const messageInput = screen.getByLabelText(/message/i);


		// const submitBtn = screen.getByRole("button");
		// fireEvent.click(submitBtn);
		// const fireSubmit = async () => {
		// 	fireEvent.click(screen.getByRole("button"));
		// }
		// const addedData = screen.getByTestId("data-render");
		act(() => {
			fireEvent.change(firstNameInput, { target: { value: "Name", name: "firstName" } });
			fireEvent.change(lastNameInput, { target: { value: "Last", name: "lastName" } });
			fireEvent.change(emailInput, { target: { value: "ch@z.com", name: "email" } });
			fireEvent.change(messageInput, { target: { value: "message goes here", name: "message" } });
			fireEvent.click(screen.getByRole("button"));
		});
		setTimeout(() => {
			const data = screen.getByTestId("added")
			expect(data).toBeInTheDocument();
		}, 20);
	})

});
