/**
 * Sync my tools
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
( function ( mw, $ ) {
	'use strict';

	function syncJS() {
		var jsPage = 'User:' + mw.config.get( 'wgUserName' ) + '/vector.js',
			toolsPage = 'User:' + mw.config.get( 'wgUserName' ) + '/Tools.js';
		$( '#firstHeading' ).injectSpinner( 'spinner-sync-js' );
		( new mw.Api() ).post( {
			action: 'edit',
			title: jsPage,
			text: '//{ {subst:' + toolsPage + '}}\n{' +
				'{subst:' + toolsPage + '}}',
			summary: 'Atualização com {' + '{subst:[[' + toolsPage + ']]}}',
			minor: true,
			watchlist: 'nochange',
			token: mw.user.tokens.get( 'csrfToken' )
		} )
		.done( function ( data ) {
			var edit = data.edit;
			if ( edit && edit.result && edit.result === 'Success' ) {
				mw.notify(
					$( '<p>Seu vector.js <a href="' +
						mw.util.getUrl( jsPage ) + '?diff=' + ( edit.newrevid || 0 ) +
					'">foi editado</a>.</p>' )
				);
			} else {
				mw.notify( 'Houve um erro ao tentar editar seu vector.js' );
			}
		} ).always( function () {
			$.removeSpinner( 'spinner-sync-js' );
		} );
	}

	function addSyncLink() {
		$( mw.util.addPortletLink(
			'p-cactions',
			'#',
			'Sincronizar vector.js',
			'ca-sync-js',
			'Sincronizar o vector.js com a versão mais recente dos seus scripts'
		) ).click( function ( e ) {
			e.preventDefault();
			mw.loader.using( [ 'mediawiki.api', 'jquery.spinner' ], syncJS );
		} );
	}

	if ( /\.js$/.test( mw.config.get( 'wgTitle' ) ) && mw.config.get( 'wgDBname' ) === 'ptwikibooks' ) {
		$( addSyncLink );
	}

}( mediaWiki, jQuery ) );
