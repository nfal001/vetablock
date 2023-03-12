import React, { useRef, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { HiPlusCircle } from "react-icons/hi";
import Dashboard from "../../../Layout/Dashboard";

// CreateDevice
const Create = () => {
    const { cluster, error } = usePage().props;
    const name = useRef();
    const [inputDisabled, setInputDisabled] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(name.current.value);
        router.post("/cluster/" + cluster.id + "/device", {
            name: name.current.value,
            randomName: inputDisabled,
            clusterID: cluster.id,
        });
        return;
    };
    return (
        <div className="mt-10 px-6 max-w-xl py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="mb-4 mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Create New Device
            </h2>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-3 max-w-xl"
                method="post"
            >
                <label htmlFor="clusterName" className="mt-3">
                    <span className="dark:text-gray-300">Device Name</span>
                    <input
                        ref={name}
                        disabled={inputDisabled}
                        required={!inputDisabled}
                        minLength="4"
                        className="block w-full mt-5 text-sm form-input disabled:bg-slate-400/10"
                        placeholder="your device name"
                        type="text"
                        name="deviceName"
                    />
                </label>
                <label className="flex flex-row-reverse justify-end gap-2">
                    <span className="dark:text-white">use Random name </span>
                    <input
                        onClick={() => {
                            setInputDisabled((e) => !e);
                        }}
                        type="checkbox"
                        name="randomname"
                        className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    />
                </label>
                <label htmlFor="submit" className="mt-3 mb-4">
                    <input
                        type="submit"
                        name="submit"
                        id="submit"
                        className="cursor-pointer px-4 py-2 flex items-center justify-between font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        value="Add New Devices"
                    />
                </label>
            </form>
        </div>
    );
};

Create.layout = (page) => (
    <Dashboard childern={page} title="Add New Device - VetaBlock" />
);

export default Create;
