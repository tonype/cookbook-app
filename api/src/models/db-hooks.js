const Recipe = require('./recipes');

/**
 * findOneAndDelete
 * Remove all Recipe Ingredient associations upon Ingredient delete.
 * @param document - the Mongo document that has just been deleted
 * @param filterProp - the property we want to filter by for Recipes
 */
async function removeRecipeIngredientRelationship (document, filterProp) {
    const relationshipDocId = document._id;
    
    const filter = {
        [filterProp]: relationshipDocId
    };

    const [ pullConditionDoc, pullConditionSubArray ] = filterProp.split('.');
    const pullCondition = {
        [pullConditionDoc]: {
            [pullConditionSubArray]: relationshipDocId
        }
    };

    return await Recipe.model.updateMany(filter, { $pull: pullCondition });
};

module.exports = {
    removeRecipeIngredientRelationship
};
