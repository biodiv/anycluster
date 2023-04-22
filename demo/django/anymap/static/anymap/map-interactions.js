"use strict";
import { ClusterMethod } from "/static/anycluster-openlayers.js";

// filter buttons
const filters = {
    "flower" : {
        "column": "style",
        "value": "flower",
        "operator" : "="
    },
    "stone" : {
        "column": "style",
        "value": "stone",
        "operator" : "="
    },
    "japanese" : {
        "column": "style",
        "value": "japanese",
        "operator" : "="
    },
    "flowerAndStone" : {
        "column": "style",
        "value": ["flower", "stone"],
        "operator" : "in"
    },
    "notFlower": {
        "column": "style",
        "value": "flower",
        "operator" : "!="
    },
    "notFlowerOrStone": {
        "column": "style",
        "value": ["flower", "stone"],
        "operator" : "not in"
    },
    "freeEntrance" : {
        "column": "free_entrance",
        "value": true,
        "operator" : "="
    },
    "paidEntrance" : {
        "column": "free_entrance",
        "value": false,
        "operator" : "="
    }
}

const kmeansButton = document.getElementById("kmeans-button");
const gridButton = document.getElementById("grid-button");

let bavaria = null;

fetch("/static/anymap/bavaria.geojson")
    .then((response) => response.json())
    .then((data) => {
        bavaria = data;
    });

const viewportButton = document.getElementById("geometry-viewport");
const areaButton = document.getElementById("geometry-area");

const entranceButtons = document.querySelectorAll('input[name="entrance-fee"]');
const gardenTypeButtons = document.querySelectorAll('input[name="gardentype"]');



let activeGardenFilter = null;
let activeEntranceFilter = null;


export class MapInteractions {

    constructor(anyclusterClient){

        this.anyclusterClient = anyclusterClient;
    
        kmeansButton.addEventListener("click", function (event) {
            anyclusterClient.setClusterMethod(ClusterMethod.kmeans);
        });

        gridButton.addEventListener("click", function (event) {
            areaButton.checked = false;
            viewportButton.checked = true;
            anyclusterClient.setClusterMethod(ClusterMethod.grid);
        });

        viewportButton.addEventListener("click", function (event) {
            anyclusterClient.setArea(null);
        });

        areaButton.addEventListener("click", function (event) {
            gridButton.checked = false;
            kmeansButton.checked = true;
            anyclusterClient.setArea(bavaria);
        });

        gardenTypeButtons.forEach(button => {
            button.addEventListener("click", this.applyGardenStyleFilter.bind(this));
        });


        entranceButtons.forEach(button => {
            button.addEventListener("click", this.applyEntranceFeeFilter.bind(this));
        });
    }

    applyEntranceFeeFilter(event){
        
        const entranceFee = document.querySelector('input[name="entrance-fee"]:checked').value;

        if (activeEntranceFilter != null) {
            const removeFilters = [
                activeEntranceFilter
            ];

            this.anyclusterClient.removeFilters(removeFilters, false);
            activeEntranceFilter = null;
        }
        
        if (entranceFee == 'all') {

            this.anyclusterClient.postFilterChange();
        }
        else {
            const filterToAdd = filters[entranceFee];
            this.anyclusterClient.addFilter(filterToAdd);
            activeEntranceFilter = filterToAdd;
        }
    }

    applyGardenStyleFilter(event){

        const gardenStyle = document.querySelector('input[name="gardentype"]:checked').value;

        if (activeGardenFilter != null) {
            const removeFilters = [
                activeGardenFilter
            ];

            this.anyclusterClient.removeFilters(removeFilters, false);
            activeGardenFilter = null;
        }
        
        if (gardenStyle == 'all') {

            this.anyclusterClient.postFilterChange();
        }
        else {
            const filterToAdd = filters[gardenStyle];
            this.anyclusterClient.addFilter(filterToAdd);
            activeGardenFilter = filterToAdd;
        }
    }


}