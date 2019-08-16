import { TYPES } from '../constants';
import { ILeaseTransaction } from '@bancoin/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, pipe, prop } from '../utils';


export const lease = factory<IWavesGuiLease, TWithPartialFee<ILeaseTransaction<string>>>({
    ...getDefaultTransform(),
    amount: pipe<IWavesGuiLease, TMoney, string>(prop('amount'), getCoins),
    recipient: prop('recipient')
});

export interface IWavesGuiLease extends IDefaultGuiTx<typeof TYPES.LEASE> {
    amount: TMoney;
    recipient: string;
}