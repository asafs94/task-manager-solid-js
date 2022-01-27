import type { RouteDefinition } from "solid-app-router";
import { lazy } from "solid-js";

const routes: RouteDefinition[] = [
    {
        path: '/',
        component: lazy(()=>import('~/pages/Home/Home')),
    }
];

export default routes;