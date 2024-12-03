import Equipment from '../models/equipment';
import Category from '../models/category';
import Contractor from '../models/contractor';
import ExtContractor from '../models/externalContractor';
import ObjectDir from '../models/object';
import Unit from '../models/unit';
import EquipmentDto from '../dtos/equipment.dto';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import Nomenclature from '../models/nomenclature';

const create = async (
    supportFrequency: number | undefined,
    lastTO: Date | undefined,
    nextTO: Date | undefined,
    objectId: string,
    contractorId: string | undefined,
    extContractorId: string | undefined,
    photo: string | undefined,
    nomenclatureId: string
) => {
    const nomenclature = await Nomenclature.findByPk(nomenclatureId, { include: [{ model: Category }] });
    if (!nomenclature) throw new ApiError(httpStatus.BAD_REQUEST, 'No nomenclature with id ' + nomenclatureId);
    const object = await ObjectDir.findByPk(objectId, { include: [{ model: Unit }] });
    if (!object) throw new ApiError(httpStatus.BAD_REQUEST, 'No object with id ' + objectId);
    let contractor, extContractor;
    if (contractorId) {
        contractor = await Contractor.findByPk(contractorId);
        if (!contractor) throw new ApiError(httpStatus.BAD_REQUEST, 'No contractor with id ' + contractorId);
    }
    if (extContractor) {
        extContractor = await ExtContractor.findByPk(extContractorId);
        if (!extContractor) throw new ApiError(httpStatus.BAD_REQUEST, 'No extContractor with id ' + extContractorId);
    }
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    const equipment = await Equipment.create({
        number: 0,
        name: nomenclature.name,
        supportFrequency,
        lastTO,
        nextTO: nextTO || now,
        comment: nomenclature.comment,
        photo,
        categoryId: nomenclature.Category?.id,
        unitId: object.Unit?.id,
        objectId,
        contractorId,
        extContractorId,
        nomenclatureId,
    });
    equipment.ExtContractor = extContractor;
    equipment.Contractor = contractor;
    equipment.Object = object;
    equipment.Nomenclature = nomenclature;
    return new EquipmentDto(equipment);
};

const getAll = async (pagination: any) => {
    const equipment = await Equipment.findAll({
        include: [
            { model: Nomenclature, include: [{ model: Category }] },
            { model: Contractor },
            { model: ExtContractor },
            { model: ObjectDir, include: [{ model: Unit }] },
        ],
        limit: pagination.limit,
        offset: pagination.offset,
        order: [['number', 'ASC']],
    });
    return equipment.map(e => new EquipmentDto(e));
};

const getOne = async (equipmentId: string) => {
    const equipment = await Equipment.findByPk(equipmentId, {
        include: [
            { model: Nomenclature, include: [{ model: Category }] },
            { model: Contractor },
            { model: ExtContractor },
            { model: ObjectDir, include: [{ model: Unit }] },
        ],
    });
    if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'No equipment with id ' + equipmentId);
    return new EquipmentDto(equipment);
};

const destroy = async (equipmentId: string) => {
    const equipment = await Equipment.findByPk(equipmentId);
    if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'No equipment with id ' + equipmentId);
    await equipment.destroy();
};

const update = async (
    equipmentId: string,
    supportFrequency: number | undefined,
    lastTO: Date | undefined,
    nextTO: Date | undefined,
    photo: string | undefined,
    objectId: string | undefined,
    contractorId: string | undefined,
    extContractorId: string | undefined,
    nomenclatureId: string | undefined
) => {
    const equipment = await Equipment.findByPk(equipmentId);
    if (!equipment) throw new ApiError(httpStatus.BAD_REQUEST, 'No equipment with id ' + equipmentId);
    if (objectId) {
        const object = await ObjectDir.findByPk(objectId);
        if (!object) throw new ApiError(httpStatus.BAD_REQUEST, 'No object with id ' + objectId);
    }
    if (contractorId) {
        const contractor = await Contractor.findByPk(contractorId);
        if (!contractor) throw new ApiError(httpStatus.BAD_REQUEST, 'No contractor with id ' + contractorId);
    }
    if (extContractorId) {
        const extContractor = await ExtContractor.findByPk(extContractorId);
        if (!extContractor) throw new ApiError(httpStatus.BAD_REQUEST, 'No extContractor with id ' + extContractorId);
    }
    if (nomenclatureId) {
        const nomenclature = await Nomenclature.findByPk(nomenclatureId);
        if (!nomenclature) throw new ApiError(httpStatus.BAD_REQUEST, 'No nomenclature with id ' + nomenclatureId);
    }

    await equipment.update({
        supportFrequency,
        lastTO,
        nextTO,
        photo,
        objectId,
        nomenclatureId,
        contractorId: contractorId ? contractorId : null,
        extContractorId: extContractorId ? extContractorId : null,
    });
};

export default {
    create,
    getAll,
    getOne,
    destroy,
    update,
};