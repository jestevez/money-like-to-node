import { ALIAS, TYPES } from '../constants';
import { IAliasTransaction } from '@bancoin/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop, pipe, length, lt, gt } from '../utils';
import { charsInDictionary, createValidator, isString, requiredValidator, validate } from '../validators';


export const alias = factory<IWavesGuiAlias, IAliasTransaction<string>>({
    ...getDefaultTransform(),
    alias: pipe(
        prop('alias'),
        validate(
            requiredValidator('alias'),
            createValidator(isString, 'Alias is not a string!'),
            createValidator(pipe(length, gt(ALIAS.MAX_ALIAS_LENGTH)), `Alias max length is ${ALIAS.MAX_ALIAS_LENGTH}`),
            createValidator(pipe(length, lt(ALIAS.MIN_ALIAS_LENGTH)), `Alias min length is ${ALIAS.MIN_ALIAS_LENGTH}`),
            createValidator(charsInDictionary(ALIAS.AVAILABLE_CHARS), `Available alias chars is "${ALIAS.AVAILABLE_CHARS}"`)
        )
    )
});

export interface IWavesGuiAlias extends IDefaultGuiTx<typeof TYPES.ALIAS> {
    alias: string;
}