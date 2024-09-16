import 'reflect-metadata';
import { RequestHandler } from 'express';
interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler;
}
export declare const all: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export declare const get: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export declare const post: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export declare const put: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export declare const del: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export declare const patch: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export declare const options: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export declare const head: (path: string) => (target: any, key: string, desc: RouteHandlerDescriptor) => void;
export {};
