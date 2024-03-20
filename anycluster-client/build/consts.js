"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultMaxZoom = exports.LogicalOperators = exports.Operators = exports.DefaultMarkerImageSizes = exports.DefaultGridSizes = exports.IconType = exports.GeometryType = exports.ClusterMethod = exports.SRIDS = void 0;
var SRIDS;
(function (SRIDS) {
    SRIDS["EPSG4326"] = "EPSG:4326";
    SRIDS["EPSG3857"] = "EPSG:3857";
})(SRIDS = exports.SRIDS || (exports.SRIDS = {}));
var ClusterMethod;
(function (ClusterMethod) {
    ClusterMethod["kmeans"] = "kmeans";
    ClusterMethod["grid"] = "grid";
})(ClusterMethod = exports.ClusterMethod || (exports.ClusterMethod = {}));
var GeometryType;
(function (GeometryType) {
    GeometryType["viewport"] = "viewport";
    GeometryType["area"] = "area";
})(GeometryType = exports.GeometryType || (exports.GeometryType = {}));
var IconType;
(function (IconType) {
    IconType["exact"] = "exact";
    IconType["rounded"] = "rounded";
})(IconType = exports.IconType || (exports.IconType = {}));
var DefaultGridSizes;
(function (DefaultGridSizes) {
    DefaultGridSizes[DefaultGridSizes["grid"] = 64] = "grid";
    DefaultGridSizes[DefaultGridSizes["kmeans"] = 150] = "kmeans";
})(DefaultGridSizes = exports.DefaultGridSizes || (exports.DefaultGridSizes = {}));
exports.DefaultMarkerImageSizes = {
    1: [24, 39],
    5: [30, 30],
    10: [30, 30],
    50: [40, 40],
    100: [40, 40],
    1000: [50, 50],
    10000: [60, 60]
};
var Operators;
(function (Operators) {
    Operators["in"] = "in";
    Operators["notIn"] = "not in";
    Operators["equals"] = "=";
    Operators["unEquals"] = "!=";
    Operators["largerThan"] = ">=";
    Operators["smallerThan"] = "<=";
    Operators["startswith"] = "startswith";
    Operators["contains"] = "contains";
})(Operators = exports.Operators || (exports.Operators = {}));
var LogicalOperators;
(function (LogicalOperators) {
    LogicalOperators["AND"] = "AND";
    LogicalOperators["OR"] = "OR";
})(LogicalOperators = exports.LogicalOperators || (exports.LogicalOperators = {}));
exports.DefaultMaxZoom = 13;
