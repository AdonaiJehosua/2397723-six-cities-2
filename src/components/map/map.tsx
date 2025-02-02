import React, { useRef, useEffect, memo } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const/const';
import 'leaflet/dist/leaflet.css';
import {
  useAppSelector,
  useMap
} from '../../hooks';
import { getActiveCity, getHoveredOffer } from '../../store/app-data/app-data.selectors';
import classNames from 'classnames';
import { OfferData } from '../../types';

type Props = {
  offers: OfferData[];
  className: string;
  currentOfferId?: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function MapComponent({ className, offers, currentOfferId }: Props): React.JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const hoveredOffer = useAppSelector(getHoveredOffer);
  const mapRef = useRef(null);
  const markedIcon = currentOfferId ? currentOfferId : hoveredOffer?.id;
  const city = className === 'cities__map' ? activeCity : offers[0].city;
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && city) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            offer.id === markedIcon
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, hoveredOffer, markedIcon, city]);

  return <section className={classNames(className, 'map')} ref={mapRef}></section>;
}

export const Map = memo(MapComponent);
