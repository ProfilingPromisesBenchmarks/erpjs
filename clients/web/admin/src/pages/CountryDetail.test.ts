import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import CountryDetail from './CountryDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/countries';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<CountryDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(CountryDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock.data.countries[0].displayName);
            expect(document.body.contains(displayName));
            const currency = getByText(mock.data.countries[0].isoCode);
            expect(document.body.contains(currency));
            done();
        }, 200);
    });
});
