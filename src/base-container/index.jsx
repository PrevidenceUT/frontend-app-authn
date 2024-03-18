import React, { useEffect, useState } from 'react';

import { breakpoints } from '@edx/paragon';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

import { DefaultLargeLayout, DefaultMediumLayout, DefaultSmallLayout } from './components/default-layout';
import {
  ImageExtraSmallLayout, ImageLargeLayout, ImageMediumLayout, ImageSmallLayout,
} from './components/image-layout';
import { AuthLargeLayout, AuthMediumLayout, AuthSmallLayout } from './components/welcome-page-layout';
import { DEFAULT_LAYOUT, IMAGE_LAYOUT } from './data/constants';
import { Helmet } from 'react-helmet';

const BaseContainer = ({ children, showWelcomeBanner, username }) => {
  const [baseContainerVersion, setBaseContainerVersion] = useState(DEFAULT_LAYOUT);

  useEffect(() => {
    const initRebrandExperiment = () => {
      if (window.experiments?.rebrandExperiment) {
        setBaseContainerVersion(window.experiments?.rebrandExperiment?.variation);
      } else {
        window.experiments = window.experiments || {};
        window.experiments.rebrandExperiment = {};
        window.experiments.rebrandExperiment.handleLoaded = () => {
          setBaseContainerVersion(window.experiments?.rebrandExperiment?.variation);
        };
      }
    };
    initRebrandExperiment();
  }, []);

  if (baseContainerVersion === IMAGE_LAYOUT) {
    return (
      <div className="layout">
        <MediaQuery maxWidth={breakpoints.extraSmall.maxWidth - 1}>
          {showWelcomeBanner ? <AuthSmallLayout username={username} /> : <ImageExtraSmallLayout />}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.small.minWidth} maxWidth={breakpoints.small.maxWidth - 1}>
          {showWelcomeBanner ? <AuthSmallLayout username={username} /> : <ImageSmallLayout />}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.medium.minWidth} maxWidth={breakpoints.large.maxWidth - 1}>
          {showWelcomeBanner ? <AuthMediumLayout username={username} /> : <ImageMediumLayout />}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.extraLarge.minWidth}>
          {showWelcomeBanner ? <AuthLargeLayout username={username} /> : <ImageLargeLayout />}
        </MediaQuery>
        <div className={classNames('content', { 'align-items-center mt-0': showWelcomeBanner })}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" 
        rel="stylesheet"></link>
      </Helmet>
      
      {/* <div className="col-md-12 extra-large-screen-top-stripe" /> */}
      <div className="layout">
        {/* <MediaQuery maxWidth={breakpoints.small.maxWidth - 1}>
          {showWelcomeBanner ? <AuthSmallLayout username={username} /> : <DefaultSmallLayout />}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.medium.minWidth} maxWidth={breakpoints.large.maxWidth - 1}>
          {showWelcomeBanner ? <AuthMediumLayout username={username} /> : <DefaultMediumLayout />}
        </MediaQuery>
        <MediaQuery minWidth={breakpoints.extraLarge.minWidth}>
          {showWelcomeBanner ? <AuthLargeLayout username={username} /> : <DefaultLargeLayout />}
        </MediaQuery> */}
        
        <div className={classNames('content', { 'align-items-center mt-0': showWelcomeBanner })}>

          {children}

        </div>
      </div>
    </>
  );
};

BaseContainer.defaultProps = {
  showWelcomeBanner: false,
  username: null,
};

BaseContainer.propTypes = {
  children: PropTypes.node.isRequired,
  showWelcomeBanner: PropTypes.bool,
  username: PropTypes.string,
};

export default BaseContainer;
