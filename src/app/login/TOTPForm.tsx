import React, { useState } from 'react';
import { c } from 'ttag';
import { requiredValidator } from 'proton-shared/lib/helpers/formValidators';
import { noop } from 'proton-shared/lib/helpers/function';

import { Button, useLoading, FormField, InputTwo, useFormErrors } from 'react-components';

import ButtonSpacer from '../public/ButtonSpacer';

interface Props {
    onSubmit: (totp: string) => Promise<void>;
}

const TOTPForm = ({ onSubmit }: Props) => {
    const [loading, withLoading] = useLoading();
    const [totp, setTotp] = useState('');
    const [isTotpRecovery, setIsRecovery] = useState(false);

    const { validator, onFormSubmit } = useFormErrors();

    return (
        <form
            name="totpForm"
            className="signup-form"
            onSubmit={(event) => {
                event.preventDefault();
                if (loading || !onFormSubmit()) {
                    return;
                }
                withLoading(onSubmit(totp)).catch(noop);
            }}
            autoComplete="off"
            method="post"
        >
            {isTotpRecovery ? (
                <FormField
                    id="recovery-code"
                    bigger
                    label={c('Label').t`Recovery code`}
                    error={validator([requiredValidator(totp)])}
                >
                    <InputTwo disableChange={loading} autoFocus value={totp} onValue={setTotp} />
                </FormField>
            ) : (
                <FormField
                    id="twoFa"
                    bigger
                    label={c('Label').t`Two-factor authentication code`}
                    error={validator([requiredValidator(totp)])}
                >
                    <InputTwo disableChange={loading} autoFocus value={totp} onValue={setTotp} />
                </FormField>
            )}
            <Button
                size="large"
                color="norm"
                shape="ghost"
                type="button"
                fullWidth
                onClick={() => {
                    if (loading) {
                        return;
                    }
                    setTotp('');
                    setIsRecovery(!isTotpRecovery);
                }}
            >
                {isTotpRecovery ? c('Action').t`Use two-factor authentication code` : c('Action').t`Use recovery code`}
            </Button>
            <ButtonSpacer mode="secondary">
                <Button size="large" color="norm" type="submit" fullWidth loading={loading}>
                    {c('Action').t`Authenticate`}
                </Button>
            </ButtonSpacer>
        </form>
    );
};

export default TOTPForm;
