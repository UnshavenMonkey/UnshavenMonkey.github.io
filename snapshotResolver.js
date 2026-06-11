module.exports = {
    // resolves from test to snapshot path
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return testPath.replace('src/', '__snapshots__/') + snapshotExtension
    },

    // resolves from snapshot to test path
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        return snapshotFilePath
            .replace('__snapshots__/', 'src/')
            .slice(0, -snapshotExtension.length)
    },

    // Example test path, used for preflight consistency check of the implementation above
    testPathForConsistencyCheck: 'some/example.test.js'
}