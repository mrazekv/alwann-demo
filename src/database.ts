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
