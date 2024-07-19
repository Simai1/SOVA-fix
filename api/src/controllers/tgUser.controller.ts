import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import roles from '../config/roles';
import tgUserService from '../services/tgUser.service';

const create = catchAsync(async (req, res) => {
    const { name, role, tgId } = req.body;
    if (!name) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing name');
    if (!role) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing role');
    if (!tgId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing tgId');
    if (!Object.values(roles).includes(role) && (role == 1 || role == 2))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role');
    const user = await tgUserService.create(name, role, tgId);
    res.json(user);
});

const findOneByTgId = catchAsync(async (req, res) => {
    const { tgId } = req.params;
    if (!tgId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing tgId');
    const user = await tgUserService.findUserByTgId(tgId);
    res.json(user);
});

const getAll = catchAsync(async (req, res) => {
    const users = await tgUserService.getAll();
    res.json(users);
});

export default {
    create,
    findOneByTgId,
    getAll,
};