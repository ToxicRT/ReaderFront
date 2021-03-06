import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import ReaderContainer from './ReaderContainer';
import { FETCH_CHAPTER } from './queries';

const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: {
        workStub: 'infection',
        language: 2,
        volume: 1,
        chapter: 1,
        subchapter: 0
      }
    },
    result: {
      data: {
        chapterByWorkAndChapter: { ...releases[0], pages }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  // Append a div to test our UncontrolledTooltip
  const commentsTooltip = document.createElement('div');
  commentsTooltip.setAttribute('id', 'show-comments');
  document.body.appendChild(commentsTooltip);

  const commentsDownload = document.createElement('div');
  commentsDownload.setAttribute('id', 'download-chapter');
  document.body.appendChild(commentsDownload);

  const commentsSettings = document.createElement('div');
  commentsSettings.setAttribute('id', 'settings-button');
  document.body.appendChild(commentsSettings);

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/read/infection/en/1/1.0']}>
        <Route path="/read/:stub/:lang/:volume/:chapter.:subchapter">
          <ReaderContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
  });
});

it('should render an error page', async () => {
  const errormocks = [
    {
      request: {
        query: FETCH_CHAPTER,
        variables: {
          workStub: 'infection',
          language: 2,
          volume: 1,
          chapter: 1,
          subchapter: 0
        }
      },
      error: new Error('Nope')
    }
  ];

  // Append a div to test our UncontrolledTooltip
  const commentsTooltip = document.createElement('div');
  commentsTooltip.setAttribute('id', 'show-comments');
  document.body.appendChild(commentsTooltip);

  const commentsDownload = document.createElement('div');
  commentsDownload.setAttribute('id', 'download-chapter');
  document.body.appendChild(commentsDownload);

  const commentsSettings = document.createElement('div');
  commentsSettings.setAttribute('id', 'settings-button');
  document.body.appendChild(commentsSettings);

  const wrapper = mountWithIntl(
    <MockedProvider mocks={errormocks} addTypename={false}>
      <MemoryRouter initialEntries={['/read/infection/en/1/1.0']}>
        <Route path="/read/:stub/:lang/:volume/:chapter.:subchapter">
          <ReaderContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();

    expect(wrapper.find('#error_general')).toBeTruthy();
  });
});
