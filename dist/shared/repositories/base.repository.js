"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(schemaModel) {
        this.LIMIT_DEFAULT = 25;
        this._model = schemaModel;
    }
    async create(data) {
        const entity = new this._model(data);
        return (await entity.save());
    }
    async insert(createDto) {
        const createdEntity = new this._model(createDto);
        return (await createdEntity.save()).toJSON();
    }
    async updateMany(condition, updateDto) {
        return await this._model.updateMany(condition, updateDto, { new: true });
    }
    async saveAll(entities) {
        return await this._model.bulkSave(entities);
    }
    async update(id, updateDto) {
        return await this._model.findByIdAndUpdate(id, updateDto, { new: true });
    }
    async updateOne(filter, update, options = { new: true }) {
        return this._model.findOneAndUpdate(filter, update, options);
    }
    async updateById(id, update, options = { new: true }) {
        return this._model.findByIdAndUpdate(id, update, options);
    }
    async findById(id) {
        return await this._model.findById(id);
    }
    async findOne(condition) {
        return await this._model.findOne(condition);
    }
    async findAll() {
        return await this._model.find();
    }
    async findBy(condition) {
        return await this._model.find(condition);
    }
    async find(where) {
        return await this._model.find(where);
    }
    async delete(id) {
        return await this._model.findByIdAndDelete(id);
    }
    async softDelete(id) {
        return await this._model.findByIdAndDelete(id, { new: true });
    }
    async findPage(filter) {
        try {
            let { condition, page, limit, selectCols, population, sort } = filter;
            if (!sort || !Object.keys(sort).length) {
                sort = {
                    createdAt: -1,
                };
            }
            if (!limit) {
                limit = this.LIMIT_DEFAULT;
            }
            if (!page) {
                page = 1;
            }
            limit = limit != 0 ? limit : limit;
            const skip = page != 0 && page != 1 ? (page - 1) * limit : page - 1;
            const totalCount = await this._model.countDocuments(condition);
            const totalPage = Math.ceil(totalCount / limit);
            const query = this._model.find(condition);
            if (selectCols && selectCols.length) {
                query.select(selectCols);
            }
            if (population && population.length) {
                query.populate(population);
            }
            const documents = await query.sort(sort).skip(skip).limit(limit).exec();
            return this.createTableObject(page, limit, documents, totalCount, totalPage);
        }
        catch (error) {
            throw error;
        }
    }
    async getByAggregate(aggregate) {
        let documents = [];
        if (aggregate && aggregate.length) {
            documents = await this._model.aggregate(aggregate).exec();
        }
        return documents;
    }
    createTableObject(page, limit, documents, totalCount, totalPage) {
        const objectListData = {
            page: page,
            limit,
            totalCount: totalCount,
            totalInList: documents.length,
            data: documents,
            totalPage,
        };
        return objectListData;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map