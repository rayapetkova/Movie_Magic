import Cast from "../models/Cast.js";

export default {
    async getAll(filter) {
        let castsQuery = Cast.find();

        if (filter.excludes) {
            castsQuery = castsQuery.nin('_id', filter.excludes)
        }

        let casts = await castsQuery;

        return casts;
    },
    create(castData) {
        return Cast.create(castData);
    }
}