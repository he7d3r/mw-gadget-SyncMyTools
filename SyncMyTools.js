/**
 * Sync my tools
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/SyncMyTools.js]] ([[File:User:Helder.wiki/Tools/SyncMyTools.js]])
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

function syncJS (){
	var JsPage = 'User:' + mw.config.get( 'wgUserName' ) + '/vector.js';
	$( '#firstHeading' ).injectSpinner( 'spinner-sync-js' );
	( new mw.Api() ).post( {
		action: 'edit',
		title: JsPage,
		text: '//{ {subst:User:Helder.wiki/Tools.js}}\n{' +
			'{subst:User:Helder.wiki/Tools.js}}',
		summary: 'Atualização a partir de [[User:Helder.wiki/Tools.js|/Tools.js]]',
		minor: true,
		watchlist: 'nochange',
		token: mw.user.tokens.get( 'editToken' )
	} )
	.done( function( data ) {
		if ( data && data.edit && data.edit.result && data.edit.result === 'Success' ) {
			mw.notify(
				$( '<p>Seu vector.js <a href="' +
					mw.util.wikiGetlink( JsPage ) + '?diff=0' +
				'">foi editado</a>.</p>' )
			);
		} else {
			mw.notify( 'Houve um erro ao tentar editar seu vector.js' );
		}
	} ).always( function(){
		$.removeSpinner( 'spinner-sync-js' );
	} );
}

function addSyncLink (){
	$( mw.util.addPortletLink(
		'p-cactions',
		'#',
		'Sincronizar vector.js',
		'ca-sync-js',
		'Sincronizar o vector.js com a versão mais recente dos seus scripts'
	) ).click( function(e){
		e.preventDefault();
		mw.loader.using( [ 'mediawiki.api.edit', 'jquery.spinner' ], syncJS );
	} );
}

if( /\.js$/.test( mw.config.get( 'wgTitle' ) ) && mw.config.get( 'wgDBname' ) === 'ptwikibooks' ){
	$( addSyncLink );
}

}( mediaWiki, jQuery ) );
