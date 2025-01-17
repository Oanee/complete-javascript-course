'use strict';
import * as model from './model'
import recipeView from './views/recipeView';
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";
import addRecipeView from "./views/addRecipeView";
import {MODAL_CLOSE_SEC} from "./config";

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
// 	module.hot.accept()
// }

const controlRecipies = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return
		recipeView.renderSpinner()

		// 0) Update result view to mark selected search result
		resultsView.update(model.getSearchResultsPage())

		// 3) Updating bookmarks view
		bookmarksView.update(model.state.bookmarks)

		// 1) Loading recipe
		await model.loadRecipe(id)

		// 2) Rendering recipe
		recipeView.render(model.state.recipe)
	} catch (err) {
		recipeView.renderError()
	}
}

const controlSearchResults = async function () {
	try {
		resultsView.renderSpinner()

		// 1) Get search query
		const query = searchView.getQuery()
		if (!query) return

		// 2) Load search results
		await model.loadSearchResults(query)

		// 3) Render results
		// resultsView.render(model.state.search.results)
		resultsView.render(model.getSearchResultsPage())

		// 4) Render initial pagination buttons
		paginationView.render(model.state.search)
	} catch (err) {
		console.log(err)
	}
}

const controlPagination = function(goToPage) {
	// 1) Render NEW results
	resultsView.render(model.getSearchResultsPage(goToPage))

	// 2) Render NEW pagination buttons
	paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
	// Update the recipe servings (in state)
	model.updateServings(newServings)

	// Update the recipe view
	recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
	// 1) Add/remove bookmark
	if (!model.state.recipe.bookmarked) {
		model.addBookmark(model.state.recipe)
	} else {
		model.deleteBookmark(model.state.recipe.id)
	}

	// 2) Update recipe view
	recipeView.update(model.state.recipe)

	// 3) Render bookmarks
	bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
	bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
	try {
		addRecipeView.renderSpinner()

		await model.uploadRecipe(newRecipe)

		recipeView.render(model.state.recipe)

		addRecipeView.renderMessage()

		bookmarksView.render(model.state.bookmarks)

		window.history.pushState(null, '', `#${model.state.recipe.id}`)

		setTimeout(function() {
			addRecipeView.toggleWindow()
		}, MODAL_CLOSE_SEC * 1000)

	} catch (err) {
		addRecipeView.renderError(err.message)
	}
}

const init = function () {
	bookmarksView.addHandlerRender(controlBookmarks)
	recipeView.addHandleRender(controlRecipies)
	recipeView.addHandlerUpdateServings(controlServings)
	recipeView.addHandlerAddBookmark(controlAddBookmark)
	searchView.addHandlerSearch(controlSearchResults)
	paginationView.addHandlerClick(controlPagination)
	addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()
