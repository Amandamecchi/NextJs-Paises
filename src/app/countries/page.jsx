"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Pagination } from "antd"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CountryCard from "../../components/CountryCard";
import CountryModal from "../../components/CountryModal";
import Loading from "../../components/Loading";
import styles from "./Countries.module.css";
import { Skeleton } from "antd";

const regions = ["africa", "americas", "antarctic", "asia", "europe", "oceania"];

export default function Countries() { 
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchComCache = async () => {
      const cacheKey = "countriesData";
      const cache = sessionStorage.getItem(cacheKey);
      
      if (cache) {
        setCountries(JSON.parse(cache));
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
        sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      } catch (error) {
        alert("Erro ao carregar países: " + error.message);
      } 
    };

    fetchComCache();
  }, []);

  const fetchCountries = async (region = "") => {
    setIsLoading(true);
    try {
      const url = region
        ? `https://restcountries.com/v3.1/region/${region}`
        : "https://restcountries.com/v3.1/all";
      const response = await axios.get(url);
      setCountries(response.data);
      if (!region) {
        setAllCountries(response.data);
        toast.success("Todos os países carregados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao carregar países:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const resetFilter = () => fetchCountries();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCountries = countries.slice(startIndex, endIndex);

  const handleCardClick = (country) => {
    toast.info(`Você clicou em ${country.name.common}`, {});
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnHouver theme="light" />
      <h1>Lista de Países do Mundo</h1>
      <div>
        {regions.map((region) => (
          <button
            key={region}
            className={styles.button}
            onClick={() => fetchCountries(region)}
          >
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </button>
        ))}
        <button className={styles.buttonReset} onClick={resetFilter}>
          Mostrar Todos
        </button>
      </div>

      <div className={styles.cardContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          currentCountries.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              onClick={() => setSelectedCountry(country)}
            />
          ))
        )}
      </div>

      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={countries.length}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        hideOnSinglePage={true}
        style={{ marginTop: "20px" }}
      />

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          onClick={handleCardClick}
        />
      )}
    </div>
  );
}
