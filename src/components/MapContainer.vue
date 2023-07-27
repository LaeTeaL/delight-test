<template>
  <div ref="map-root" class="map-container"></div>
</template>

<script>
import dataCountryCodes from '@/data/country-codes.json'
import { GeoJSON } from 'ol/format'
import { OSM } from 'ol/source'
import Map from 'ol/Map'
import View from 'ol/View'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import TileLayer from 'ol/layer/Tile'
import { Fill, Stroke, Style } from 'ol/style'
import 'ol/ol.css'

const source = new VectorSource({
  url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson',
  format: new GeoJSON()
})

let fillColor = '#eeeeee'

const style = new Style({
  fill: new Fill({
    color: fillColor
  }),
  stroke: new Stroke({
    color: '#b1c7bb'
  })
})

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ]
})

export default {
  name: 'MapContainer',
  props: ['code'],
  mounted() {
    map.setTarget(this.$refs['map-root'])
    map.addLayer(this.getLayer())
    map.setView(this.getView())
  },
  computed: {
    getMapCode() {
      let currentCode = this.code
      let newCode = null

      dataCountryCodes.forEach(function (element) {
        if (element['a2'] === currentCode) {
          newCode = element['a3']
        }
      })
      return newCode
    }
  },
  methods: {
    getLayer() {
      const mapCode = this.getMapCode

      return new VectorLayer({
        source: source,
        style: function (feature) {
          if (feature.getId() === mapCode) {
            const polygon = feature.getGeometry()
            map.getView().fit(polygon, { padding: [20, 30, 30, 40] })
          }
          style
            .getFill()
            .setColor(feature.getId() === mapCode ? '#16a87f' : fillColor)

          return style
        }
      })
    },
    getView() {
      return new View({
        zoom: 0,
        center: [0, 0]
      })
    }
  },
  watch: {
    getMapCode: function () {
      map.addLayer(this.getLayer())
      map.setView(this.getView())
    }
  }
}
</script>

<style>
.map-container {
  display: block;
  width: 100%;
  max-width: 400px;
  height: 200px;
  margin: auto;
}
</style>
