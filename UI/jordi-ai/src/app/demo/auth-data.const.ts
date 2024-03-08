import {AuthData, CloudProvider, GeographicArea} from '@spotinst/spot-client-shared';

export const demoAuthData: AuthData = {
    currentUser: {
        id:                     123,
        firstName:              'Todd',
        lastName:               'Chavez',
        displayName:            'Todd Chavez',
        email:                  'toddCha@gmail.com',
        roleBitMask:            2,
        roleTitle:              'user',
        mfaEnabled:             false,
        isCAPermissionsEnabled: true
    },
    currentOrganization: {
        id:             '9441',
        alias:          'bojack',
        provider:       CloudProvider.AWS,
        defaultAccount: 'act-123',
        isDefault:      true,
        ssoEnabled:     false,
        roleBitMask:    1
    },
    currentAccount: {
        id:             'act-123',
        name:           'kim',
        providers:      [
            {
                accountId: 'pr-123',
                alias:     'aws',
                id:        'act-123',
                type:      CloudProvider.AWS
            }
        ],
        geographicArea: GeographicArea.GLOBAL
    },
    accessToken: 'kuku'
};
