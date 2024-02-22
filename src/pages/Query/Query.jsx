import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from 'dayjs';
import "./style.scss";

let filters = {
    sort_by:"primary_release_date.desc"
    
};

const color = "gray";
  const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          sizeMedium: {
            color
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color
          }
        }
      }
    }
  });
function formatDate(date)
{

    const format = date.year() + "-" + parseInt(date.month()+1) + "-" + date.date();
    return format
}

const Query = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
  

    const [startDate, setStartDate] = useState(formatDate(dayjs().subtract(2, 'month')));
    const [endDate,setEndDate]=useState(formatDate(dayjs()));

    
    
    
    
    const { data: genresData } = useFetch(`/discover/movie`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/movie?&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/movie?page=${pageNum}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        
        
        setData(null);
        setPageNum(1);
        fetchInitialData();
    }, [startDate,endDate]);


    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        { "Movie Range Query"}
                    </div>
                    <div className="filters">
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={dayjs(startDate)}
                                    maxDate={dayjs(endDate)}
                                    onChange={(date)=>
                                        setStartDate(formatDate(date))
                                    }
                                    label="start date"
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={dayjs(endDate)}
                                    minDate={dayjs(startDate)}
                                    onChange={(date) => {
                                            setEndDate(formatDate(date));
                                    }}
                                    label="end date"
                                
                                />
                            </LocalizationProvider>
                        </ThemeProvider>
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType="movie"
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Query;
