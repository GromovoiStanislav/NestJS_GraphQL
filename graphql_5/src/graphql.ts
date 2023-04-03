
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum PatchSize {
    SMALL = "SMALL",
    LARGE = "LARGE"
}

export interface Launch {
    id: string;
    site?: Nullable<string>;
    mission?: Nullable<Mission>;
    rocket?: Nullable<Rocket>;
    isBooked: boolean;
}

export interface Rocket {
    id: string;
    name?: Nullable<string>;
    type?: Nullable<string>;
}

export interface Mission {
    name?: Nullable<string>;
    missionPatch?: Nullable<string>;
}

export interface IQuery {
    launches(): Nullable<Launch>[] | Promise<Nullable<Launch>[]>;
    launch(id: string): Nullable<Launch> | Promise<Nullable<Launch>>;
    me(): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: string;
    email: string;
    trips: Nullable<Launch>[];
}

export interface IMutation {
    login(email?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;
    bookTrips(launchIds: Nullable<string>[]): TripUpdateResponse | Promise<TripUpdateResponse>;
    cancelTrip(launchId: string): TripUpdateResponse | Promise<TripUpdateResponse>;
}

export interface TripUpdateResponse {
    success: boolean;
    message?: Nullable<string>;
    launches?: Nullable<Nullable<Launch>[]>;
}

type Nullable<T> = T | null;
