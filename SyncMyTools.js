/**
 * Sync my tools
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/SyncMyTools.js]] ([[File:User:Helder.wiki/Tools/SyncMyTools.js]])
 */
/*jslint browser: true, white: true*/
/*global mediaWiki, jQuery*/
( function ( mw, $ ) {
'use strict';

function syncCommonJS (){
	var api = new mw.Api(),
		commonJsPage = 'User:' + mw.config.get( 'wgUserName' ) + '/common.js';
	$( '#firstHeading' ).injectSpinner( 'spinner-sync-common-js' );
	api.post( {
		action: 'edit',
		title: commonJsPage,
		text: '//{ {subst:User:Helder.wiki/Tools.js}}\n{' +
			'{subst:User:Helder.wiki/Tools.js}}',
		summary: 'Atualização',
		minor: true,
		watchlist: 'nochange',
		token: mw.user.tokens.get( 'editToken' )
	} )
	.done( function( data ) {
		if ( data && data.edit && data.edit.result && data.edit.result === 'Success' ) {
			mw.notify(
				$( '<p>Seu common.js <a href="' +
					mw.util.wikiGetlink( commonJsPage ) + '?diff=0' +
				'">foi editado</a>.</p>' )
			);
		} else {
			mw.notify( 'Houve um erro ao tentar editar seu common.js' );
		}
	} ).always( function(){
		$.removeSpinner( 'spinner-sync-common-js' );
	} );
}

function addSyncLink (){
	$( mw.util.addPortletLink(
		'p-cactions',
		'#',
		'Sincronizar common.js',
		'ca-sync-common-js',
		'Sincronizar o common.js com a versão mais recente dos seus scripts'
	) ).click( function(e){
		e.preventDefault();
		mw.loader.using( [ 'mediawiki.api.edit', 'jquery.spinner' ], syncCommonJS );
	} );
}

if( /\.js$/.test( mw.config.get( 'wgTitle' ) ) && mw.config.get( 'wgDBname' ) === 'ptwikibooks' ){
	$(addSyncLink);
}

}( mediaWiki, jQuery ) );
