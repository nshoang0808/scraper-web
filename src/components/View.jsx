import React, { useState } from "react";
import {useMutation} from "@tanstack/react-query";
import {apiClient} from "../apiClient";
import {useForm} from "react-hook-form";
import ListImage from "./ListImage";
import {Grid} from "@mui/material";
import ListVideo from "./ListVideo";
export default function View() {
    const [mediaId, setMediaId ] = useState(0);
    const { mutate } = useMutation({
        mutationFn: async (data) => {
            return await apiClient.post(
                "/scraper/parse",
                { urls: data['urls'].split(',') },
                { withCredentials: true }
            );
        },
    });

    const { register, handleSubmit } = useForm();

    const onSubmit = (formData) => {
        mutate(formData, {
            onSuccess: async (response) => {
                setMediaId(response.data['id']);
            },
        });
    };
    return (
        <div>
            <Grid height='100px' container alignItems="center" justifyContent="center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={6} alignItems="center" justifyContent="center">
                        <label>List urls: </label>
                    </Grid>
                    <Grid>
                        <input {...register("urls", {required: true})} type='text' style={{ width: "500px" }}/>
                    </Grid>
                </form>
            </Grid>
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <ListImage id={mediaId}/>
                <ListVideo id={mediaId}/>
            </Grid>
        </div>
    );
}