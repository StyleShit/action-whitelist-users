const core      = require('@actions/core');
const github    = require('@actions/github');
const fs        = require('fs');

// Get the current user who initiated the workflow.
const currentUser = github.context.actor;

// Stop the workflow run if the user is not allowed.
if ( ! isUserAllowed( currentUser ) )
{
    core.setFailed( `${ currentUser } is not allowed to run this workflow.` );
}


/**
 * Generate an array of user names from both the comma-separated list and the whitelist file.
 * 
 * @returns {string[]}
 */
function generateWhitelist()
{
    // Get an array of users from the comma-separated list.
    const listFromString = core.getInput( 'whitelist' ).split( ',' ).map( ( userName ) => { 
        return userName.trim();
    } );


    // Get an array of user from the whitelist file.
    const path = core.getInput( 'whitelist-file' ).trim();
    let listFromFile = [];

    if ( path )
    {
        try
        {
            const file = fs.readFileSync( path );

            listFromFile = file.toString().split( '\n' ).map( ( userName ) => {
                return userName.trim();
            } );
        }

        catch ( e )
        {
            core.error( 'Cannot read whitelist file.' );
            core.error( e );
        }
    }

    return [ ...listFromString, ...listFromFile ];
};


/**
 * Determine if a user is in the whitelist.
 * 
 * @param {string} userName - A user name to check.
 * 
 * @returns {boolean}
 */
function isUserAllowed( userName )
{
    const list = generateWhitelist();

    return list.includes( userName.trim() );
}