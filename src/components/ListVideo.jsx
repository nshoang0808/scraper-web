import {apiClient} from "../apiClient";
import React, {useEffect, useState} from 'react';
import Pagination from "./Pagination";
import {Card, CardMedia, Grid} from "@mui/material";

export default function ListVideo({ id }) {
    const pageNumberLimit = 5;
    const [videoData, setVideoData] = useState({ media: [], total: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(2);
    const [minPageLimit, setMinPageLimit] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data: response } = await apiClient.get(`/scraper/${id}`, {
                withCredentials: true,
                params: { type: 'video', page: currentPage}
            })
            setVideoData(response);
        };
        if (id !== 0) fetchData()
    },[id, currentPage])

    const onPageChange= (pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    const onPrevClick = ()=>{
        if((currentPage-1) % pageNumberLimit === 0){
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev=> prev-1);
    }

    const onNextClick = ()=>{
        if(currentPage+1 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev=>prev+1);
    }

    const paginationAttributes = {
        currentPage,
        maxPageLimit,
        minPageLimit,
        totalPages: videoData.total
    }

    return (
        <Grid item xs={6}>
            <Card sx={{ maxWidth: 345 }}>
                { videoData.media.map((item) => (
                    <CardMedia
                        component="video"
                        height="140"
                        src={item}
                        alt="video"
                        controls
                    />
                ))}
            </Card>
            <Pagination {...paginationAttributes} onPrevClick={onPrevClick} onNextClick={onNextClick} onPageChange={onPageChange}/>
        </Grid>
    );
}