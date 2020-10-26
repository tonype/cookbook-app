const Recipe = require('../models/recipes.model');
const debug = require('debug')('cookbook:db-hooks');

// TODO for buildPullCondition: revisit, this can be cleaned up...
// Only need to handle subarrays one level deep for now, might need to extend later.
const buildPullCondition = (filterProp, relDocId) => {
    if (filterProp.includes('.')) {
        const [ relDocName, recipeRelPropName ] = filterProp.split('.');
        return {
            [relDocName]: {
                [recipeRelPropName]: relDocId
            }
        };
    } else {
        return {
            [filterProp]: relDocId
        };
    }
};

/**
 * removeRecipeRelationship
 * Remove all Recipe relationships upon delete for specific document.
 * @param document - the Mongo document that has just been deleted
 * @param relDocName - the property we want to filter by for Recipes to remove the relationship
 */
const removeRecipeRelationship = async (document, relDocName) => {
    const relDocId = document._id;
    const filter = { [relDocName]: relDocId };
    debug(`removing ${document.name} from all recipes`);
    return await Recipe.model.updateMany(filter, { $pull: buildPullCondition(relDocName, relDocId) });
};

module.exports = {
    removeRecipeRelationship
};
