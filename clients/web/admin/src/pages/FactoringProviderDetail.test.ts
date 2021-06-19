import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import FactoringProviderDetail from './FactoringProviderDetail.svelte';
import { setupLocales } from '../i18n';
import { mock1 } from '../lib/queries/factoringProvider';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<FactoringProviderDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(FactoringProviderDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock1.data.factoringProvider.displayName);
            expect(document.body.contains(displayName));
            const legalName = getByText(mock1.data.factoringProvider.legalName);
            expect(document.body.contains(legalName));
            done();
        }, 200);
    });
});
