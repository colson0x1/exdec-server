import 'reflect-metadata';
import { RequestHandler } from 'express';
export declare function use(middleware: RequestHandler): (target: any, key: string, desc: PropertyDescriptor) => void;
