import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { InvoiceEvent } from '@/hooks/useInvoices';

export default function Notification({
  eventData,
  onClose,
}: {
  eventData: InvoiceEvent;
  onClose: () => void;
}) {
  const [show, setShow] = useState(true);
  const notificationIconTypes = {
    Bad: <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />,
    Good: (
      <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
    ),
  };

  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Transition
      show={show}
      appear={true}
      as={Fragment}
      enter="transform ease-out duration-100 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {eventData.message && eventData.message.type ? (
                notificationIconTypes[eventData.message.type]
              ) : (
                <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                Successfully saved !
              </p>
              {eventData.message && eventData.message.content && (
                <p className="mt-1 text-sm text-gray-500">
                  {eventData.message.content}
                </p>
              )}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  setShow(false);
                }}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
