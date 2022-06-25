import axios from "axios";
import { Plan } from "../models/plan";

const apiUrl = "https://fit-back-server.herokuapp.com";

interface AuthParams {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export const login = (data: AuthParams) =>
  axios({
    method: "POST",
    url: `${apiUrl}/login`,
    data,
  }).then((res) => res.data);

export const register = (data: AuthParams) =>
  axios({
    method: "POST",
    url: `${apiUrl}/user`,
    data,
  }).then((res) => res.data);

export const getClients = (skip: number) =>
  axios({
    method: "GET",
    url: `${apiUrl}/users`,
    params: {
      skip,
    },
  }).then((res) => res.data);

export const deleteClient = (id: string) =>
  axios({
    method: "DELETE",
    url: `${apiUrl}/user`,
    data: {
      id,
    },
  }).then((res) => res.data);

export const getPlans = (skip: number) =>
  axios({
    method: "GET",
    url: `${apiUrl}/plans`,
    params: {
      skip,
    },
  }).then((res) => res.data);

export const createPlans = (data: Plan) =>
  axios({
    method: "POST",
    url: `${apiUrl}/plan`,
    data,
  }).then((res) => res.data);

export const getPlanById = (id: number) =>
  axios({
    method: "GET",
    url: `${apiUrl}/plan`,
    params: {
      id,
    },
  }).then((res) => res.data);

export const updatePlan = (data: Plan) =>
  axios({
    method: "PUT",
    url: `${apiUrl}/plan`,
    data,
  }).then((res) => res.data);

export const deletePlan = (id: number) =>
  axios({
    method: "DELETE",
    url: `${apiUrl}/plan`,
    data: { id },
  }).then((res) => res.data);

export const updateUser = (data: any) =>
  axios({
    method: "PUT",
    url: `${apiUrl}/user`,
    data,
  }).then((res) => res.data);

export const getPlansByType = (skip: number, type: string) =>
  axios({
    method: "GET",
    url: `${apiUrl}/plans/${type}`,
    params: {
      skip,
    },
  }).then((res) => res.data);

export const createWorkout = (data: any) =>
  axios({
    method: "POST",
    url: `${apiUrl}/workout`,
    data,
  }).then((res) => res.data);

export const getWorkouts = (skip: number, userId: number) =>
  axios({
    method: "GET",
    url: `${apiUrl}/workouts/${userId}`,
    params: {
      skip,
    },
  }).then((res) => res.data);

export const getWorkout = (id: string) =>
  axios({
    method: "GET",
    url: `${apiUrl}/workout/`,
    params: {
      id,
    },
  }).then((res) => res.data);
