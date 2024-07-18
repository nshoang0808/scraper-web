import {apiClient} from "../apiClient";
import React, {useEffect, useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from "./Pagination";
import {Grid} from "@mui/material";

export default function ListImage({ id }) {
    const pageNumberLimit = 5;
    const [imageData, setImageData] = useState({ media: [], total: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(9);
    const [minPageLimit, setMinPageLimit] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data: response } = await apiClient.get(`/scraper/${id}`, {
                withCredentials: true,
                params: { type: 'image', page: currentPage}
            })
            setImageData(response);
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
        totalPages: imageData.total
    }

    return (
        <Grid item xs={6}>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                { imageData.media.map((item) => (
                    <ImageListItem key={item}>
                        <img
                            srcSet={`${item}`}
                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                            loading='lazy'
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Pagination {...paginationAttributes} onPrevClick={onPrevClick} onNextClick={onNextClick} onPageChange={onPageChange}/>
        </Grid>
    );
}