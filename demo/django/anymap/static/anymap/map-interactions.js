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

const nestedFilterButton = document.getElementById('nested-button');

const totalCount = document.getElementById("total-garden-count");
const stoneCount = document.getElementById("stone-garden-count");
const flowerCount = document.getElementById("flower-garden-count");

const mapContentList = document.getElementById("map-content-list");

const exactCountOnButton = document.getElementById("exactcounts-on");
const exactCountOffButton = document.getElementById("exactcounts-off");

let activeGardenFilter = null;
let activeEntranceFilter = null;
let activeNestedFilter = false;


export class MapInteractions {

    constructor(anyclusterClient){

        const modulations = {
            'stone' : {
                'column': 'style',
                'value': 'stone',
                'operator': '=',
            },
            'flower': {
                'filters': [{
                    'column': 'style',
                    'value': 'flower',
                    'operator': '=',
                }]
            }
        };

        anyclusterClient.onGotClusters = async function(){

            const counts = await anyclusterClient.getMapContentCount(modulations);

            totalCount.textContent = counts['count'];
            flowerCount.textContent = counts['modulations']['flower']['count'];
            stoneCount.textContent = counts['modulations']['stone']['count'];


            const groups = await anyclusterClient.getGroupedMapContents('style');
            console.log(groups);

            /*if ('flower' in groups){
                flowerCount.textContent = groups['flower']['count'];
            }

            if ('stone' in groups){
                stoneCount.textContent = groups['stone']['count'];
            }*/

            const contentList = await anyclusterClient.getMapContents(20, 0);

            mapContentList.innerHTML = '';
            
            contentList.forEach(dataset => {

                let div = document.createElement("div");
                div.innerHTML = `<small>id: ${dataset.id}</small>, <strong>${dataset.style}</strong>, free entrance: ${dataset.free_entrance}`;
                
                mapContentList.appendChild(div);

            });
            
        }

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

        nestedFilterButton.addEventListener("click", this.applyNestedFilter.bind(this));

        exactCountOnButton.addEventListener("click", function (event) {
            anyclusterClient.iconType = 'exact';
            anyclusterClient.postFilterChange(true);
        });

        exactCountOffButton.addEventListener("click", function (event) {
            anyclusterClient.iconType = 'rounded';
            anyclusterClient.postFilterChange(true);
        });
    }

    applyEntranceFeeFilter(event){

        if (activeNestedFilter){
            this.anyclusterClient.resetFilters(false);
            activeNestedFilter = false;
        }
        
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

        if (activeNestedFilter){
            this.anyclusterClient.resetFilters(false);
            activeNestedFilter = false;
        }

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

    applyNestedFilter(event) {
        // flower and free OR stone and paid
        const filters = [
            {
                "filters": [
                    {
                        "column": "style",
                        "value": "flower",
                        "operator" : "="
                    },
                    {
                        "column": "free_entrance",
                        "value": true,
                        "operator" : "="
                    }   
                ]
            },
            {
                "logicalOperator": "OR",
                "filters": [
                    {
                        "column": "style",
                        "value": "stone",
                        "operator" : "=",
                        "logicalOperator": 'AND'
                    },
                    {
                        "column": "free_entrance",
                        "value": false,
                        "operator" : "="
                    }
                ]
            }
        ];

        gardenTypeButtons.forEach(button => {
            button.checked = false;
        });

        entranceButtons.forEach(button => {
            button.checked = false;
        });

        this.anyclusterClient.filter(filters);

        activeNestedFilter = true;
    }


}