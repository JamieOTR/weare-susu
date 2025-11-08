// app/config/cluster.ts
export type ClusterName = 'localnet' | 'devnet' | 'mainnet';

export const PROGRAM_IDS = {
  weare_susu: {
    localnet: '4wZNSkNLR9T1fQYHqcn5h6ZtxDERLg5jeD6nqT6RvWwh',
    devnet:  '4wZNSkNLR9T1fQYHqcn5h6ZtxDERLg5jeD6nqT6RvWwh',
    mainnet: 'REPLACE_WHEN_READY',
  },
};

export const currentCluster: ClusterName = (
  import.meta?.env?.VITE_CLUSTER ?? 'devnet'
) as ClusterName;

export const WEARE_SUSU_ID = PROGRAM_IDS.weare_susu[currentCluster];
