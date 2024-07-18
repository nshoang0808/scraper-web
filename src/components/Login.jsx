import React from "react";
import { useAuth } from "../AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { apiClient } from "../apiClient";

export default function Login() {
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            const config = { withCredentials: true };
            return await apiClient.post("/login", data, config);
        },
    });

    const { register, handleSubmit } = useForm({
        defaultValues: { username: "", password: "" },
    });

    const { loginAuth } = useAuth();
    const onSubmit = (formData) => {
        mutate(formData, {
            onSuccess: (response) => {
                loginAuth();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Username: </label>
            <br />
            <input {...register("username", { required: true })} type='text' />
            <br />
            <label>Password: </label>
            <br />
            <input {...register("password", { required: true })} type='text' />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}
