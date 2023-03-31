import {IField} from "@/types";
// @ts-ignore
import dataYaml from '/public/application.yaml'

const Form = () => {
return (
  <form>
    <div>
      {dataYaml.bitpay.design.posData.fields.map((field: IField ) => {
        switch (field.type) {
          case "select":
            return (
              <div className="mt-4" key={field.id}>
                <label htmlFor={field.name}
                       className="block text-sm font-medium text-gray-700">{field.label}</label>
                <select id={field.id} name={field.name} required={field.required}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  {field.options.map(option => {
                    return <option key={option.id} value={option.value}>{option.label}</option>
                  })}
                </select>
              </div>
            )
          case "fieldset":
            return (
              <div className="mt-4" key={field.id}>
                <fieldset>
                  <legend>{field.label}</legend>
                  {field.options.map(option => {
                    return <div key={option.id}>
                      <input type="radio"
                             value={option.value}
                             id={option.id}
                             name={field.name}
                             required={field.required}
                             className="mr-2"/>
                      <label htmlFor={option.id}>{option.label}</label>
                    </div>
                  })}
                </fieldset>
              </div>
            )
          case "text":
            return (
              <div className="mt-4" key={field.id}>
                <label className="block text-sm font-medium text-gray-700"
                       htmlFor={field.name}>{field.label}</label>
                <div className="mt-1">
                  <input type="text"
                         name={field.name}
                         className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                         id={field.id}
                         required={field.required}
                  />
                </div>
              </div>
            )
          case "price":
            return (
              <div className="mt-4" key={field.id}>
                <label className="block text-sm font-medium text-gray-700"
                       htmlFor={field.name}>{field.label}</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm"> $ </span>
                  </div>
                  <input type="number" id={field.id} name={field.name}
                         className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                         placeholder="0.00"
                         required={field.required}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm"
                                  id={field.id + '-currency'}>{field.currency}</span>
                  </div>
                </div>
              </div>
            )
          default:
            return (
              <div className="mt-4" key={field.id}>
                <label className="block text-sm font-medium text-gray-700"
                       htmlFor={field.name}>{field.label}</label>
                <div className="mt-1">
                  <input type="text"
                         name={field.name}
                         className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                         id={field.id}
                         required={field.required}
                  />
                </div>
              </div>
            )
        }

      })}
    </div>

    <div className="mt-4 text-center">
      <button type="submit">
        <img src="https://test.bitpay.com/cdn/en_US/bp-btn-pay-currencies.svg"/>
      </button>
    </div>
  </form>
)}

export default Form;