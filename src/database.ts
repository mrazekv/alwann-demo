export interface Individual {
    power: number;
    accuracy: number;
    multconf: string[];
    [key: string]: any;
    chrom: (string|number)[];
    style: string;
    tiles: number;
};

export interface DataType {
    model: string;
    systolic: string;
    run: number;
    data: Individual[];

};


export interface ResNetLayerAssignment {
    mul_index: number;
    mul: string;
    mul_power_ratio: number;
    tiles: number;
}

export interface ResNetTileInfo {
    mul: {
        id: string;
        power: number;
        area: number;
        delay: number;
        power_pct: number;
        area_pct: number;
        delay_pct: number;
        ep_pct:  number;
        mae_pct: number;
        mre_pct: number;
        wce_pct: number;
        wcre_pct: number;
    };
}

export interface ResNetAssignment {
    layers: ResNetLayerAssignment[];
    tiles: ResNetTileInfo[];
};