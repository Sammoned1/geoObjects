import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import React, { FC, useEffect, useRef } from 'react';
import { Ipoint } from '../types/pointTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addPoint, removePoint } from '../store/action_creators/points';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';

const OlMap: FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const map = useRef<Map | null>(null)
  const vectorSource = useRef(new VectorSource()).current

  const {points} = useSelector((state: RootState) => state.points)
  const {center} = useSelector((state: RootState) => state.map)

  const dispatch = useDispatch()

  const createPoint = (longitute: number, latitude: number, name: string, id: number) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([longitute, latitude])),
      name,
      id,
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05,
        }),
        text: new Text({
          text: name,
          font: '12px Arial',
          offsetY: -25,
          fill: new Fill({ color: '#000' }),
        }),
      })
    );

    return feature;
  }

  useEffect(() => {
    if (map.current) {
      const view = map.current.getView()
      
      view.animate({
        center: fromLonLat(center),
        duration: 1000,
        zoom: 12
      })
    }
  }, [center])

  useEffect(() => {
    vectorSource.clear()
    points.forEach((point) => {
      const feature = createPoint(point.longitute, point.latitude, point.name, point.id);
      vectorSource.addFeature(feature);
    });
  },[points, vectorSource])

  const generateId = (max: number) => {
    return Math.floor(Math.random() * max)
  }

  useEffect(() => {
    if (mapRef.current && !map.current) {
      map.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: vectorSource
          })
        ],
        view: new View({
          center: fromLonLat(center),
          zoom: 12,
        }),
      });

      map.current.on('singleclick', e => {
        const featuresList: Feature[] = [];
        if (map.current){
          map.current.forEachFeatureAtPixel(e.pixel, (feature) => {
            featuresList.push(feature as Feature)
          })
  
          if (featuresList.length) {
            const feature = featuresList[0]
            const id = feature.get('id')
            
            dispatch(removePoint(id))
          } else {
            let newPoint: Ipoint
            const coordinates = toLonLat(e.coordinate)
            const newId = generateId(100000)
            newPoint = {
              id: newId,
              name: `Метка ${newId}`,
              longitute: coordinates[0],
              latitude: coordinates[1]
            }
      
            dispatch(addPoint(newPoint))
          }
        }
      })
  
      return () => {
        if (map.current) {
          map.current.setTarget(undefined);
        }
      };
    }

  }, [dispatch, vectorSource])

  return (
    <div ref={mapRef} style={{width: '100%', height: 700}}>

    </div>
  )
}

export default OlMap