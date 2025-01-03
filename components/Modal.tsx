import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleDelete: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
}

export default function Modal({
  isOpen,
  setIsOpen,
  handleDelete,
  loading,
  title = "Are you Sure?",
  description = "You won't be able to revert this!",
}: Props) {
  function closeModal() {
    setIsOpen!(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="z-50 relative" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-gray-500">
                      {description}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    {loading ? (
                      <ClipLoader
                        loading={loading}
                        className="ml-3 text-primary"
                      />
                    ) : (
                      <Button onClick={handleDelete}>Yes Delete</Button>
                    )}

                    <Button onClick={closeModal} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
