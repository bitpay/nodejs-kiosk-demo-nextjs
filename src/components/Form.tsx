"use client";

import config from "@/config";
import { setInitialFormData } from "@/utils";
import { Invoice } from "@prisma/client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Error from "./Error";

export default function Form() {
  const initialFormData = setInitialFormData();
  const formFields = config.bitpay.design.posData.fields;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createInvoice = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/create-invoice`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data);
        return;
      }

      const data: Invoice = await res.json();
      const { bitpay_url } = data;

      if (bitpay_url) {
        window.location.href = bitpay_url;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    await createInvoice();
    setLoading(false);
  };

  return (
    <>
      {error && <Error>{JSON.stringify(error)}</Error>}
      <form onSubmit={handleFormSubmit}>
        <div>
          {formFields.map((field) => {
            switch (field.type) {
              case "select":
                return (
                  <div className="mt-4" key={field.id}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    <select
                      onChange={(e) =>
                        setFormData({ ...formData, [field.id]: e.target.value })
                      }
                      id={field.id}
                      name={field.name}
                      required={field.required}
                      value={(formData && formData[field.id]) || ""}
                      className="block w-full bg-white border text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray"
                    >
                      <option value="" hidden></option>
                      {field.options.map((option) => {
                        return (
                          <option key={option.id} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              case "fieldset":
                return (
                  <div className="mt-4" key={field.id}>
                    <fieldset>
                      <legend>{field.label}</legend>
                      {field.options.map((option) => {
                        return (
                          <div key={option.id}>
                            <input
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [field.id]: e.target.value,
                                })
                              }
                              type="radio"
                              value={option.value}
                              checked={
                                (formData &&
                                  formData[field.id] === option.value) ||
                                false
                              }
                              id={option.id}
                              name={field.name}
                              required={field.required}
                              className="mr-2"
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                          </div>
                        );
                      })}
                    </fieldset>
                  </div>
                );
              case "text":
                return (
                  <div className="mt-4" key={field.id}>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor={field.name}
                    >
                      {field.label}
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.id]: e.target.value,
                          })
                        }
                        value={(formData && formData[field.id]) || ""}
                        type="text"
                        name={field.name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={field.id}
                        required={field.required}
                      />
                    </div>
                  </div>
                );
              case "price":
                return (
                  <div className="mt-4" key={field.id}>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor={field.name}
                    >
                      {field.label}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="flex flex-row">
                        <span
                          className="flex items-center bg-grey-lighter border border-e-0 rounded rounded-r-none px-3 font-bold text-grey-darker"
                          id={field.id + "-currency"}
                        >
                          $
                        </span>
                        <input
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.id]: e.target.value,
                            })
                          }
                          type="number"
                          id={field.id}
                          value={(formData && formData[field.id]) || ""}
                          name={field.name}
                          className="shadow appearance-none border border-s-0  rounded rounded-s-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="0.00"
                          required={field.required}
                          step="any"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                );
              default:
                return (
                  <div className="mt-4" key={field.id}>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor={field.name}
                    >
                      {field.label}
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.id]: e.target.value,
                          })
                        }
                        type="text"
                        name={field.name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={field.id}
                        required={field.required}
                      />
                    </div>
                  </div>
                );
            }
          })}
        </div>

        <div className="mt-4 text-center">
          <button
            type="submit"
            disabled={loading}
            className={loading ? "opacity-70" : ""}
          >
            <Image
              width={188}
              height={80}
              src="https://test.bitpay.com/cdn/en_US/bp-btn-pay-currencies.svg"
              alt="Pay with bitpay"
            />
          </button>
        </div>
      </form>
    </>
  );
}
