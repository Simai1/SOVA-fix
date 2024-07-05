import {DataTypes, Model, Sequelize} from "sequelize";
import statuses from "../config/statuses";
export default class RepairRequest extends Model {
    id!: string;
    number!: number;
    status!: number;
    unit!: string;
    object!: string;
    problemDescription!: string;
    urgency!: string;
    itineraryOrder!: number;
    completeDate!: Date;
    repairPrice!: number;
    comment!: string;
    legalEntity!: string;
    daysAtWork!: number;


    static initialize(sequelize: Sequelize) {
        RepairRequest.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                },
                number: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                },
                status: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    validate: {
                        isIn: [Object.values(statuses)],
                    },
                    defaultValue: 0,
                },
                unit: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                object: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                problemDescription: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                urgency: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                itineraryOrder: {
                    type: DataTypes.SMALLINT,
                    allowNull: true,
                },
                completeDate: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                repairPrice: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                comment: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                legalEntity: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                daysAtWork: {
                    type: DataTypes.SMALLINT,
                    allowNull: false,
                    defaultValue: 0,
                }
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'RepairRequest',
                tableName: 'repair-requests',
                paranoid: true,
            }
        );
    }
};